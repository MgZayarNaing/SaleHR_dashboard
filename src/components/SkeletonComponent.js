import React from 'react'
import { Skeleton } from '../../node_modules/@mui/material/index'

function SkeletonComponent() {
  return (
    <React.Fragment>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: '12px' }}/>
        <Skeleton variant="rectangular" height={50} />
    </React.Fragment>
  )
}

export default SkeletonComponent