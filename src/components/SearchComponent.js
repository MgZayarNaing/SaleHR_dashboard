import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';


const SearchComponents = (props) => {

    const { fetchFun } = props

    const [searchWord, setSearchWord] = useState('')


    useEffect(()=>{
        if (searchWord.length > 0) {
            setTimeout(() => {
                fetchFun(searchWord)
            }, 2000);
        }
    },[searchWord])

    return (
        <Box>
            <FormControl>
            <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                    <SearchOutlined />
                </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                'aria-label': 'weight'
                }}
                value={searchWord}
                onChange={(e)=>{setSearchWord(e.target.value)}}
                placeholder="Ctrl + K"
            />
            </FormControl>
        </Box>
)};

export default SearchComponents;
