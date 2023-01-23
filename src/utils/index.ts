import moment from 'moment'

export const truncateMiddle = (
  str: string,
  frontLen = 4,
  backLen = 4,
  truncateStr = '…',
): string => {
  if (str === null) {
    return ''
  }

  const strLen = str.length
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
  }
}

export const randomID = (n = 18, radix = 36): string => {
  const idString = (
    Number(Math.random() * Math.pow(10, n)) + Date.now()
  ).toString(radix)
  return idString
}

export const randomExamId = (): string => {
  const random = randomID()
  return new Date().getTime() + random
}

export const dateTimeConversion = (value: number, type = 'YYYY-MM-DD'): string => {
  if (!value) return ''
  return moment(value).format(type)
}

export const scoreGrade = (score: number): string => {
  if (!score) return 'Fail'
  return score > 59
    ? score > 69
      ? score > 79
        ? score > 89
          ? 'High Distinction'
          : 'Distinction'
        : 'Credit'
      : 'Pass'
    : 'Fail'
}

export const getImgWH = (url: string): Promise<[number, number]> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve([img.width, img.height])
  })
}