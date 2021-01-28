import { RelationshipStatus, User } from '@prisma/client'
import { RegisterDTO } from '@we-talk/common'
import faker from 'faker'
import { encryptPassword } from './utils/password'
import { prisma } from './utils/prisma'

const fakeUserCount = 20
const defaultPassword = '123456'

const oneFakeUser = (password: string): RegisterDTO => ({
  username: faker.phone.phoneNumber('1#########'),
  password,
  nickname: faker.name.firstName() + ' ' + faker.name.lastName(),
  avatar: faker.image.avatar(),
  intro: faker.lorem.sentence()
})

function generateUsers (password: string, n = fakeUserCount): RegisterDTO[] {
  return new Array(n).fill(0).map(() => oneFakeUser(password))
}

async function insertUsers (users: RegisterDTO[]) {
  const usersWithId = await Promise.all(users.map(data => prisma.user.create({ data })))
  console.log(JSON.stringify(usersWithId))
  return usersWithId
}

async function insertRelationships (users: User[]) {
  const requests = []
  for (let i = 0; i < users.length; i++) {
    for (let j = i; j < users.length; j++) {
      requests.push(prisma.relationship.create({
        data: { fromUserId: users[i].id, toUserId: users[j].id, status: RelationshipStatus.Friend }
      }))
    }
  }
  return await Promise.all(requests)
}

async function main () {
  const password = await encryptPassword(defaultPassword)
  const users = await insertUsers(generateUsers(password))
  const relationships = await insertRelationships(users)
}

main()
