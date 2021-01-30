import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { MessageContext } from '../context/MessageContext'
import { MessageTypeEnum, SentMessageDTO, SocketEvent } from '@we-talk/common'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { socket } from '../config/socket.config'
import { object, SchemaOf, string } from 'yup'

type MessageDTO = Pick<SentMessageDTO, 'content'>

const sentMessageSchema: SchemaOf<MessageDTO> = object({
  content: string().required()
}).defined()

export const ChatMessage = observer(() => {
  const { withId } = useParams<{withId: string}>()
  const messageStore = useContext(MessageContext)

  const handleSubmit = (value: MessageDTO, formikHelpers: FormikHelpers<MessageDTO>) => {
    const message: SentMessageDTO = {
      toUserId: Number(withId),
      type: MessageTypeEnum.PlanText,
      ...value
    }
    socket.emit(SocketEvent.Send, message)
    formikHelpers.resetForm()
  }

  return (
    <div>
      {messageStore.message(Number(withId))?.map(item => (
        <div key={item.id}>
          {item.content}
        </div>
      ))}
      <div>
        <Formik<MessageDTO>
          initialValues={{ content: '' }}
          validationSchema={sentMessageSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Field name="content" placeholder="请输入消息" />
              <button type="submit">
                发送
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
})
