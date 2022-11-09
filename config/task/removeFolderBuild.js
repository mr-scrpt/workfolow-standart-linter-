import { deleteAsync } from 'del'
export const removeFolderBuild = async () => {
  return await deleteAsync(app.direction.buildFolder)
}
