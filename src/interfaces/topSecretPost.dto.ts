export interface TopSecretPostDto {
  satellites: {
    name: string,
    distance: number,
    message: string[],
  }[]
}