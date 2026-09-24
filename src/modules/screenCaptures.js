const images = Object.entries(import.meta.glob('../../app-capture/*.png', { eager: true, query: '?url', import: 'default' }))
  .map(([file, src]) => {
    const [, number, title] = file.match(/(\d+)_(.+)\.png$/) ?? []
    return { number: Number(number), title, src }
  })

const byNumber = new Map(images.map((image) => [image.number, image]))

const groups = {
  0: [
    ['로그인·계정', [1, 48, 49, 50]],
  ],
  1: [
    ['홈·일정 조회', [2, 9, 10, 11]],
    ['일정 등록', [12, 26, 27, 28, 47]],
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
}

export const captureCount = images.length

export const screenCaptures = Object.fromEntries(
  Object.entries(groups).map(([topicIndex, sections]) => [
    topicIndex,
    sections.map(([title, numbers]) => ({
      title,
      images: numbers.map((number) => byNumber.get(number)),
    })),
  ]),
)
