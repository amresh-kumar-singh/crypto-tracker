import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`] : {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`] : {
        fontSize: 14
    }
}))

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(even)' : {
        // backgroundColor : theme.palette.action.hover,
        backgroundColor : "rgba(0, 0, 0, 0.1)",
    },
    //hide last border
    '&:last-child td , &:last-child th' : {
        border: 0
    }
}))