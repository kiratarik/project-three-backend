export class NotFound extends Error {
  constructor() {
    super()

    this.name = 'NotFound'
  }
}

export class contentError extends Error {
  constructor() {
    super()

    this.name = 'ContentError'
  }
}

export class Unauthorized extends Error {
  constructor() {
    super()

    this.name = 'Unauthorized'
  }
}


