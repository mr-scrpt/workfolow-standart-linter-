import fs from 'fs'
import path from 'path'

export const removeFolder = async (removePath) => {
  fs.rmSync(path.resolve(removePath), {
    recursive: true,
    force: true,
  })
}
