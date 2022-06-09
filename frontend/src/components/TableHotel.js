import * as React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, makeStyles ,TableContainer , Paper , TablePagination } from '@material-ui/core'
import { useEffect,useState} from 'react';
import axios from "axios";
import "./Table.css"
import { Cancel } from "@material-ui/icons"
import { Star } from "@material-ui/icons";




function Tablehotels({setShowtablehotel}) {
    const useStyles = makeStyles({
        table: {
            width: '100%',
        },
        thead: {
            '& > *': {
                fontSize: 15,
                background: '#40E0D0',
                color: '#FFFF'
                
            }
        },
        row: {
            '& > *': {
                fontSize: 12
            }
        }
    })

    const classes = useStyles();
    const[hotels,setHotels] = useState([]);
    const Hotels= async ()=>{
        try{
            const res =await axios.get("/hotels");
            setHotels(res.data);
        }catch(err){
            console.log(err);
        }
      }
    useEffect(()=>{
        const getHotels= async ()=>{
          try{
              const res =await axios.get("/hotels");
              setHotels(res.data);
          }catch(err){
              console.log(err);
          }
        };
        getHotels()
      },[]);
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

  return (
      
    <div className="Table">  
     <Paper sx={{ width: '100%' }}>
          
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell align="center">Place name</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">____Grade____</TableCell>
                    <TableCell align="center">Tel</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {hotels
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hotels)=>(
                    
        <TableRow  className={classes.row} key={hotels._id} >
        <TableCell>{hotels.namehotelth}</TableCell> 
        <TableCell>{hotels.address}</TableCell>
        <TableCell>{hotels.description}</TableCell>
        <TableCell>{hotels.price}</TableCell>
        <TableCell>
        {Array(hotels.grade).fill(<Star className="rating" />)}
        </TableCell>
        <TableCell>{hotels.tel}</TableCell>
        <TableCell>{}</TableCell>
        </TableRow>
                ))}
            </TableBody>
             
        </Table>
        </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[1,3,5]}
        component="div"
        count={hotels.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Cancel className="tableCancel" onClick={()=>setShowtablehotel(false)}/>
    </Paper>
    </div>
  
   
    
  );
}

export default React.memo(Tablehotels);