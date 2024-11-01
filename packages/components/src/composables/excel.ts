import ExcelJs from 'exceljs'
import type { DataTableBaseColumn } from 'naive-ui'
import { triggerFileDownload } from './tagADownload'

// 计算单元格的宽度，中文字符算两个宽度
export function getVisualWidth(cellValue: string | string[] | undefined) {
  if (!cellValue || Array.isArray(cellValue))
    return 0

  let width = 0
  for (let i = 0; i < cellValue.length; i += 1) {
    const charCode = cellValue.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      // 英文字符
      width += 1.3
    }
    else {
      // 中文字符
      width += 2.1
    }
  }
  return Math.round(width)
}

export async function exportExcel<T>(data: T[], cols: DataTableBaseColumn<T>[], filename: string) {
  if (data.length === 0 || cols.length === 0) {
    console.error('data or cols is empty')
    return
  }
  // set json data, key is the column name, value is the data
  const keys = cols.map(col => col.key)
  const rows = data.map((item) => {
    const row: Record<string, any> = {}
    keys.forEach((key) => {
      const col = cols.find(innerCol => innerCol.key === key)
      if (!col)
        return

      const title = col.title as string
      if (!col.render)
        row[title] = item[key as keyof T]
      else
        row[title] = col.render(item, 0)
    })
    return row
  })

  // create sheet
  const wb = new ExcelJs.Workbook()
  const ws = wb.addWorksheet('Sheet1')

  // add columns
  ws.columns = cols.map(col => ({
    header: col.title as string,
    key: col.title as string,
    width: 10,
  }))

  // 添加rows
  ws.addRows(rows)

  // 设置列宽
  cols.forEach((col, idx) => {
    const title = col.title as string
    let cellWidth = 10
    rows.forEach((row) => {
      cellWidth = Math.max(cellWidth, getVisualWidth(String(row[title])))
    })
    ws.getColumn(idx + 1).width = Math.max(getVisualWidth(ws.getColumn(idx + 1).header), cellWidth)
  })

  // 冻结第一行
  ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 1, topLeftCell: 'A2' }]

  // save file
  let filenameWithExt = filename
  if (!filename.includes('.xlsx'))
    filenameWithExt = `${filename}.xlsx`

  const buffer = await wb.xlsx.writeBuffer()
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const blob = new Blob([buffer], { type: fileType })
  triggerFileDownload(blob, filenameWithExt)
}
