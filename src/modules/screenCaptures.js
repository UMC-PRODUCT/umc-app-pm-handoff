const androidTitles = {
  '17': '활동 상단 탭',
  '24': '프로필 활동 이력',
  '35': '스레드 AI 분류',
  '36': '내 QR 공유',
  '37': '명함 교환 개발 중 안내',
  '56': '서비스 점검 차단',
  '58': '스플래시 로고',
  '59': '로그인 진입',
}

const images = Object.entries(import.meta.glob('../../app-capture/*/*.png', { eager: true, query: '?url', import: 'default' }))
  .map(([file, src]) => {
    const [, platform, id, number, title] = file.normalize('NFC').match(/\/(ios|android)\/((\d+)(?:-\d+)?)_(.+)\.png$/)
    return {
      id, number: Number(number), platform, src,
      title: (platform === 'android' && androidTitles[id]) || title.replaceAll('_', ' · '),
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }))

const groups = {
  0: [
    ['스플래시·로그인 진입', [58, 59]],
    ['로그인·계정', [1, 48, 49, 50]],
  ],
  1: [
    ['홈·일정 조회', [2, 9, 10, 11]],
    ['일정 등록', [12, 26, 27, 28, 47]],
    ['Apple Intelligence 설정 안내', [57]],
  ],
  2: [
    ['공지 목록·검색', [3, 13]],
    ['운영진 공지', [14, 15, 55]],
  ],
  3: [
    ['챌린저 출석', [4, 16, 17, 29, 30]],
    ['챌린저 스터디·구성원', [5, 31, 38, 39]],
    ['운영진 출석·모드', [18, 32, 33]],
    ['운영진 스터디·멤버', [34, 40, 41, 42, 43, 44, 51, 52]],
  ],
  4: [
    ['스레드 목록·검색·생성', [6, 19, 20, 21, 35]],
    ['스레드 대화·관리', [7, 45, 46, 53, 54]],
  ],
  6: [
    ['프로필·설정', [8, 23, 24, 25]],
    ['명함', [22, 36, 37]],
  ],
  8: [
    ['업데이트·점검 안내', [56]],
  ],
}

export const captureCount = images.length
export const capturePlatforms = [
  { id: 'ios', label: 'iOS', width: 1206, height: 2622 },
  { id: 'android', label: 'Android', width: 1080, height: 2424 },
].map((platform) => ({ ...platform, count: images.filter((image) => image.platform === platform.id).length }))

export const screenCaptures = Object.fromEntries(
  Object.entries(groups).map(([topicIndex, sections]) => [
    topicIndex,
    sections.map(([title, numbers]) => ({
      title,
      platforms: capturePlatforms.map((platform) => ({
        ...platform,
        images: numbers.flatMap((number) => images.filter((image) => image.platform === platform.id && image.number === number)),
      })),
    })),
  ]),
)
