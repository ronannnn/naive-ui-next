export function triggerFileDownload(data: Blob, filename: string) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([data]))
  link.download = filename
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

export function triggerFileDownloadFromUrl(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
