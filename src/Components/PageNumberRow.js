import React, { useState,useEffect } from 'react'
import '../App.css'

function PageNumberRow({pageNumber,updatePageNumber,currentPageNumber,setPageNumber}) {

    let pagesNumbers=[];
    const [start,setStart]= useState(1);
    const [end,setEnd]=useState(5);

    for(let i=start;i<=end;i++){
        pagesNumbers.push(i);
    }

    useEffect(() => {
    }, [currentPageNumber])

    const UpdatePageNumber = (number)=>{
        updatePageNumber(number);
    }

    const handleDoublePrevious = ()=>{
        if(start-5<0){
            setStart(start);
            setEnd(end);
        }else{
            setStart(prev=>{
                if(prev-5===1){
                    return 1;
                }else{
                    return prev-5;
                }   
            })
            setEnd(prev=>prev-5);
        }
    }

    const handlePrevious = (e)=>{
        setPageNumber(prev=> {
            if(prev-1==0){
                return prev;
            }else{
                return prev-1;
            }
        });
    }

    const handleNext = (e)=>{
        setPageNumber(prev=>{
            if(prev+1>pageNumber){
                return prev;
            }else{
                return prev+1;
            }
        });
    }

    const handleDoubleNext = (e)=>{
        if (end+5>=pageNumber){
            setStart(prev=> prev);
            setEnd(pageNumber);
        }else{
            setStart(prev =>prev+5);
            setEnd(prev =>{
                if(prev+5>pageNumber){
                    return pageNumber;
                }else{
                    return prev+5;
                }
            })
        }
    }

    return (
        <>
            <div className="p-n-p">
                <img className="icon" src="https://img.icons8.com/ios-glyphs/30/000000/double-left.png" alt=""/>
                <img className="icon" onClick={handlePrevious} src="https://img.icons8.com/windows/32/000000/back.png" alt=""/>
                <div className="page-numbers-row">
                    {pagesNumbers.map((pageNumber)=>{
                        return <p className="page-number" onClick={()=>UpdatePageNumber(pageNumber)}>{pageNumber}</p>
                    })}
                </div>
                <img className="icon" onClick={handleNext} src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-next-mintab-for-ios-becris-lineal-becris.png" alt=""/>
                <img className="icon" onClick={handleDoubleNext} src="https://img.icons8.com/ios-glyphs/30/000000/double-right--v1.png" alt=""/>
            </div>
        </>
    )
}

export default PageNumberRow
