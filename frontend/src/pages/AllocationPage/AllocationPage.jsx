import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

function AllocationPage() {
  const location = useLocation();
  useEffect(() => {
    const inputData = location.state;
    console.log(inputData);
  }, [])
  return (
    <div>AllocationPage</div>
  )
}

export default AllocationPage