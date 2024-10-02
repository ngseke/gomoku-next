import { type Chat } from '@/types/Chat'

const playerId1 = 'Sean Huang'
const playerId2 = 'John Smith'
const playerId3 = 'Mr.' + 'Long'.repeat(15)

export const mockChats: Record<string, Chat> = {
  872337500000: {
    isAdmin: true,
    message: 'The chat room is created successfully',
    createdAt: 872337500000,
  },
  872337500001: {
    isAdmin: true,
    message: 'Atveroeosetaccusamusetiustoodiodignissimosducimusquiblanditiispraesentiumvoluptatumdelenitiatquecorrupti.',
    createdAt: 872337500001,
  },

  872337600000: {
    createdBy: playerId1,
    playerName: playerId1,
    message: 'Hi',
    createdAt: 872337600000,
  },
  872337600001: {
    createdBy: playerId1,
    playerName: playerId1,
    message: 'Lorem Ipsum',
    createdAt: 872337600001,
  },
  872337600002: {
    createdBy: playerId1,
    playerName: playerId1,
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    createdAt: 872337600002,
  },

  872337600003: {
    createdBy: playerId2,
    playerName: playerId2,
    message: '這段被傳統印刷產業使用幾百年的無意義文字又再度流行',
    createdAt: 872337600003,
  },
  872337600004: {
    createdBy: playerId2,
    playerName: playerId2,
    message: '亂數假文、隨機假文',
    createdAt: 872337600004,
  },
  872434600000: {
    createdBy: playerId2,
    playerName: playerId2,
    message: '10 秒後的另一段話',
    createdAt: 872434600000,
  },
  872434600001: {
    createdBy: playerId3,
    playerName: playerId3,
    message: '名字好長==' + 'long'.repeat(20),
    createdAt: 872434600001,
  },
  872434600002: {
    createdBy: playerId1,
    playerName: playerId1,
    message: '🎄️',
    createdAt: 872434600001,
  },
  872434600003: {
    createdBy: playerId1,
    playerName: playerId1,
    message: '🧋🧊',
    createdAt: 872434600001,
  },
}
