import { NFTStorage } from "nft.storage"
import { getFilesFromPath } from "files-from-path"
import dotenv from "dotenv"
dotenv.config()

const token = process.env.NFT_STORAGE_KEY as string

async function main() {
  const path = "metadata" // <----------- Change to 'metadata' to store metadata directory
  const files = await getFilesFromPath(path)

  const formattedFiles = files.map((file) => {
    file.name = file.name.split(path + "/")[1]
    return file
  }) as Iterable<File>

  const storage = new NFTStorage({ token })

  console.log(`storing ${files.length} file(s) from ${path}`)
  const cid = await storage.storeDirectory(formattedFiles)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// Run with: npx hardhat run scripts/store_directory.ts
