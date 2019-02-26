declare namespace OverTrack {
  type Ability =
    ['ana', 'bioticgrenade' | 'sleepdart'] |
    ['bastion', 'configurationtank'] |
    ['dva', 'boosters' | 'callmech' | 'selfdestruct'] |
    ['genji', 'dragonblade' | 'swiftstrike'] |
    ['hanzo', 'dragonstrike' | 'scatterarrow' | 'sonicarrow'] |
    ['junkrat', 'concussionmine' | 'riptire' | 'steeltrap' | 'totalmayhem'] |
    ['lucio', 'soundwave'] |
    ['mccree', 'deadeye' | 'flashbang'] |
    ['mei', 'blizzard'] |
    ['mercy', 'resurrect'] |
    ['pharah', 'barrage'] |
    ['reaper', 'deathblossom'] |
    ['reinhardt', 'charge' | 'earthshatter' | 'firestrike'] |
    ['roadhog', 'chainhook' | 'wholehog'] |
    ['s76', 'helixrockets' | 'tacticalvisor'] |
    ['symmetra', 'sentryturret'] |
    ['torb', 'hammer' | 'turret'] |
    ['tracer', 'pulsebomb'] |
    ['widowmaker', 'venommine'] |
    ['winston', 'jumppack' | 'primalrage'] |
    ['zarya', 'gravitonsurge']

  type BattleTag = string

  type GameKey = string

  type GameType = 'competitive'

  namespace Hero {
    type All = Hero.Name | Hero.Other

    type Name = 'ana' | 'bastion' | 'dva' | 'genji' | 'hanzo' | 'junkrat' | 'lucio' | 'mccree' | 'mei' | 'mercy' | 'orisa' | 'pharah' | 'reaper' | 'reinhardt' | 'roadhog' | 's76' | 'sombra' | 'symmetra' | 'torb' | 'tracer' | 'widowmaker' | 'winston' | 'zarya' | 'zenyatta'

    type Other = 'dva_mech' | 'junkrat_riptire' | 'orisa_supercharger' | 'symmetra_shieldgen' | 'symmetra_teleporter' | 'torb_turret'
  }

  type Map = 'Blizzard World' | 'Busan' | 'Dorado' | 'Eichenwalde' | 'Hanamura' | 'Hollywood' | 'Horizon Lunar Colony' | 'Ilios' | 'Junkertown' | 'King\'s Row' | 'Lijiang Tower' | 'Nepal' | 'Numbani' | 'Oasis' | 'Paris' | 'Rialto' | 'Route 66' | 'Temple of Anubis' | 'Volskaya Industries' | 'Watchpoint: Gibraltar'

  type MapType = 'Assault' | 'Escort' | 'Hybrid' | 'Control'

  type PlayerName = string

  type Rank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster' | 'top500'

  type Result = 'DRAW' | 'LOSS' | 'WIN'

  type ShareKey = string

  type SR = number

  type Timestamp = number

  type UserId = number

  interface BaseGame {
    custom_game: boolean
    end_sr: SR
    game_type: GameType
    heroes_played: [Hero.Name, number][]
    map: Map
    player_battletag: BattleTag | null
    result: Result
    score: [SR, SR]
    start_sr: SR
    user_id: UserId
    viewable: boolean
  }

  interface SimpleGame extends BaseGame {
    number: Timestamp
    key: GameKey
    player_name: string
    rank: Rank
    time: Timestamp
    url: string
  }

  interface DetailedGame extends BaseGame {
    assists: DetailedGame.Assists
    avg_sr: DetailedGame.AverageSr
    endgame_statistics: DetailedGame.EndgameStatistics
    spectate_bar?: DetailedGame.SpectateBar
    game_number: number
    game_ended: Timestamp
    game_started: Timestamp
    group_size: number
    hero_played: DetailedGame.HeroPlayed
    hero_statistics: DetailedGame.HeroStatistics
    key: GameKey
    killfeed: DetailedGame.Killfeed
    map_type: MapType
    objective_stages: DetailedGame.ObjectiveStages
    owner: BattleTag
    player: PlayerName
    tab_statistics: DetailedGame.TabStatistics
    teams: DetailedGame.Teams
    twitch: string
    ults?: DetailedGame.Ults
  }

  namespace DetailedGame {
    type Assists = [Timestamp, PlayerName | null, number, number][]

    type AverageSr = [SR | null, SR | null]

    type EndgameStatistics = unknown

    type SpectateValue <T> = [T[], T[], T[], T[], T[], T[], T[], T[], T[], T[], T[], T[]]
    interface SpectateBar {
      heroes: SpectateValue<[Timestamp, Hero.Name]>
      has_ult: SpectateValue<[Timestamp, boolean]>
    }

    interface HeroPlayed {
      time_played: { [hero in Hero.Name]?: number }
      swaps: [Timestamp, Hero.Name][]
    }

    interface HeroStatistic {
      damage: number
      deaths: number
      elims: number
      healing: number
      hero_stat_1?: number
      hero_stat_2?: number
      hero_stat_3?: number
      hero_stat_4?: number
      hero_stat_5?: number
      hero_stat_6?: number
      objective_kills: number
      objective_time: number
      tab_health: number
      time_played: number
    }

    type HeroStatistics = { [hero in Hero.Name]?: HeroStatistic } & { ALL: HeroStatistic }

    type Killfeed = [
      Timestamp,         // Timestamp
      number,            // Type
      Hero.Name,         // Left Hero
      PlayerName | null, // Left Player
      Hero.Name,         // Right Hero
      PlayerName | null, // Right Player
      Hero.All[],        // Assisters
      Ability | null     // Killicon
    ][]

    namespace ObjectiveStage {
      interface Base {
        stage: string
        start: Timestamp
        end: Timestamp
      }

      interface Control extends Base {
        stage: ''
        ownership: Array<{
          start: Timestamp
          end: Timestamp
          owner: 'red' | 'blue'
        }>
        end_score: [number, number]
        round_winner: 'red' | 'blue'
      }

      interface NotControl extends Base {
        stage: 'Attack' | 'Defend'
        end_score: number
        progress?: number
        format_progress?: string
        remaining?: number
        checkpoints: [Timestamp, number][]
      }

      namespace Assault {
        interface Event {
          time: Timestamp
          type: 'tick'
          tick: number
        }
      }

      interface Assault extends NotControl {
        events: Assault.Event[]
      }

      namespace Escort {
        interface Event {
          start: Timestamp
          end: Timestamp
          start_progress: number
          end_progress: number
          type: 'pushing'
        }
      }

      interface Escort extends NotControl {
        events: Escort.Event[]
      }

      interface Hybrid extends NotControl {
        events: Array<Assault.Event | Escort.Event>
      }

      type All = Assault | Escort | Hybrid | Control
    }

    type ObjectiveStages = ObjectiveStage.All[]

    interface TabStatistics {
      damage: number[]
      deaths: number[]
      elims: number[]
      healing: number[]
      hero_stat_1: Array<number | null>
      hero_stat_2: Array<number | null>
      hero_stat_3: Array<number | null>
      hero_stat_4: Array<number | null>
      hero_stat_5: Array<number | null>
      hero_stat_6: Array<number | null>
      hero: Hero.Name[]
      objective_kills: number[]
      objective_time: number[]
      time: Timestamp[]
    }

    type Team = [
      { name: PlayerName, rank: Rank },
      { name: PlayerName, rank: Rank },
      { name: PlayerName, rank: Rank },
      { name: PlayerName, rank: Rank },
      { name: PlayerName, rank: Rank },
      { name: PlayerName, rank: Rank },
    ]

    interface Teams {
      blue: Team
      red: Team
    }

    type Ults = [Timestamp, Timestamp][]
  }

  interface Games {
    games: SimpleGame[]
  }
}
