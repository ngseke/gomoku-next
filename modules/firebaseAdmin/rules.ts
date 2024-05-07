export const rules = {
  rules: {
    chats: {
      '.read': true,
      '.write': false,
    },
    playerStates: {
      $playerId: {
        '.read': '$playerId === auth.uid',
        '.write': '$playerId === auth.uid && data.exists() && !newData.exists()',
      },
    },
    playerMousePositions: {
      $playerId: {
        '.read': true,
        '.write': `
          $playerId === auth.uid &&
          (newData.val() == null || (newData.hasChildren(['0', '1']) &&
          newData.child('0').isNumber() &&
          newData.child('1').isNumber()))
        `,
      },
    },
    rooms: {
      $roomId: {
        '.read': true,
        players: {
          $playerId: {
            '.write': '$playerId === auth.uid && data.exists() && !newData.exists()',
          },
        },
      },
    },
    boards: {
      '.read': true,
      '.write': false,
    },
  },
}
