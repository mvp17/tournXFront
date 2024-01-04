const championsLeague = {};
export const teamAv = {
  name: 'avengers',
  game: 'baseball',
  level: 'advanced',
  maxPlayers: 7,
  leader: 'steve',
  players: [
    {
      id: 1,
      username: 'mvp17',
      email: 'mvp17@udl.cat',
      password: 'sfsdfsd1f6516',
      enabled: true,
    },
    {
      id: 2,
      username: 'yhn16',
      email: 'yhn16@udl.cat',
      password: 'sntkullsd1f6516',
      enabled: true,
    },
    {
      id: 3,
      username: 'edc85',
      email: 'edc85@udl.cat',
      password: 's2353jukfsd1f6516',
      enabled: true,
    },
    {
      id: 4,
      username: 'tgb17',
      email: 'tgb17@udl.cat',
      password: 'uloili--f6516',
      enabled: true,
    },
  ],
};
export const teamGG = {
  name: 'guardians',
  game: 'baseball',
  level: 'advanced',
  maxPlayers: 7,
  leader: 'steve',
  players: [
    {
      id: 5,
      username: 'ggr45',
      email: '@udl.cat',
      password: 'sfsdfsd1f6516',
      enabled: true,
    },
    {
      id: 6,
      username: 'rthrt',
      email: 'yhn16@udl.cat',
      password: 'sntkullsd1f6516',
      enabled: true,
    },
    {
      id: 7,
      username: 'yh67',
      email: 'edc85@udl.cat',
      password: 's2353jukfsd1f6516',
      enabled: true,
    },
    {
      id: 8,
      username: 'erer254',
      email: 'tgb17@udl.cat',
      password: 'uloili--f6516',
      enabled: true,
    },
  ],
};

export const teamF4 = {
  name: 'fantastic 4',
  game: 'voleyball',
  level: 'advanced',
  maxPlayers: 7,
  leader: 'reed',
  players: [
    {
      id: 9,
      username: 'johnny',
      email: '@udl.cat',
      password: 'sfsdfsd1f6516',
      enabled: true,
    },
    {
      id: 10,
      username: 'sue',
      email: 'yhn16@udl.cat',
      password: 'sntkullsd1f6516',
      enabled: true,
    },
    {
      id: 11,
      username: 'ben',
      email: 'edc85@udl.cat',
      password: 's2353jukfsd1f6516',
      enabled: true,
    },
  ],
};

export const mockMatches = [
  {
    id: 0,
    description: 'dd',
    winner: {
      name: 'avengers',
      game: 'baseball',
      level: 'advanced',
      maxPlayers: 7,
      leader: 'steve',
      players: [
        {
          id: 1,
          username: 'mvp17',
          email: 'mvp17@udl.cat',
          password: 'sfsdfsd1f6516',
          enabled: true,
        },
        {
          id: 2,
          username: 'yhn16',
          email: 'yhn16@udl.cat',
          password: 'sntkullsd1f6516',
          enabled: true,
        },
        {
          id: 3,
          username: 'edc85',
          email: 'edc85@udl.cat',
          password: 's2353jukfsd1f6516',
          enabled: true,
        },
        {
          id: 4,
          username: 'tgb17',
          email: 'tgb17@udl.cat',
          password: 'uloili--f6516',
          enabled: true,
        },
      ],
    },
    round: {
      id: 12,
      numTeams: 2,
      winner: teamAv,
      nextRound: null,
      tournament: championsLeague,
      rivals: [teamAv, teamGG],
    },
  },
];
