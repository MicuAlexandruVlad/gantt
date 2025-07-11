import type Task from "../../../data/Task"
import ExcelJS from "exceljs"

export const createExcelFile = (data: Task[], fileName: string): void => {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Tasks", {
        pageSetup: {
            fitToWidth: 1,
            fitToPage: true
        }
    })

    console.log("Creating Excel file with data:", data)

    sheet.addRow(['ID', 'Name', 'Start', 'End', 'Progress', 'Notes'])
    
    // Style the header row
    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
    }

    data.forEach((task) => {
        sheet.addRow([
            task.id,
            task.name,
            task.start.toLocaleDateString(),
            task.end.toLocaleDateString(),
            task.progress,
            task.notes
        ])
    })

    // Auto-fit columns
    sheet.columns.forEach((column, index) => {
        let maxLength = 0
        const columnLetter = String.fromCharCode(65 + index) // A, B, C, etc.
        
        sheet.getColumn(columnLetter).eachCell({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : ''
            if (cellValue.length > maxLength) {
                maxLength = cellValue.length
            }
        })
        
        // Set column width with some padding
        column.width = Math.max(maxLength + 2, 10) // minimum width of 10
    })

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${fileName}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }).catch((error) => {
        console.error("Error creating Excel file:", error)
    })
}
