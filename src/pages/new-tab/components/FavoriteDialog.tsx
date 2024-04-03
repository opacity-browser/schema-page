import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useGetPageStrings } from '../hooks/usePageStrings'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'

export default ({ handleClickDialogCancel, handleClickDialogAdd }) => {
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()

  const [isShow, setIsShow] = useState(false)
  const [title, setTItle] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    setIsShow(true)
  }, [])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if(name === "title") setTItle(value)
    if(name === "address") setAddress(value)
  }

  const handleClickClosed = () => {
    setIsShow(false)
    setTimeout(() => {
      handleClickDialogCancel()
    }, 300)
  }

  const handleClickAdded = () => {
    if(title === "" || address === "") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["Please enter title or address"]
      }])
      return
    }
    setIsShow(false)
    setTimeout(() => {
      handleClickDialogAdd(title, address)
    }, 300)
  }

  return (
    <$dialog className={isShow ? 'show' : ''}>
      <div 
        className='bg' 
        onClick={handleClickClosed}
      />
      <$contentBox className={isShow ? 'show' : ''}>
        <p>Add Favorite</p>
        <div className='input-area'>
          <div>
            <p>Title</p>
            <input type="text" name="title" onChange={handleChangeInput} value={title} />
          </div>
          <div>
            <p>Address</p>
            <input type="text" name="address" onChange={handleChangeInput} value={address} />
          </div>
        </div>
        <div className="btn-area">
          <p className="add" onClick={handleClickAdded}>Add</p>
          <p onClick={handleClickClosed}>Cancel</p>
        </div>
      </$contentBox>
    </$dialog>
  )
}


const $dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background 0.3s;
    background: rgba(0, 0, 0, 0);
  }
  
  &.show .bg {
    background: rgba(0, 0, 0, 0.2);
  }
`

const $contentBox = styled.div`
  position: relative;
  width: 400px;
  background: #fff;
  z-index: 10;
  border-radius: 12px;
  box-shadow: 2px 2px 30px rgba(0,0,0,0.2);
  margin-top: -150px;
  padding: 20px 20px 18px;
  transition: opacity 0.2s, transform 0.3s;
  opacity: 0;
  transform: translateY(-20px);

  &.show {
    transition: opacity 0.2s 0.1s, transform 0.3s 0.1s;
    opacity: 1;
    transform: translateY(0);
  }

  & > p {
    margin: 0;
    font-size: 14px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .btn-area {
    text-align: right;
    margin-top: 5px;
    p {
      display: inline-block;
      padding: 6px 18px;
      font-size: 13px;
      border: 1px solid #ddd;
      background: #f5f5f5;
      border-radius: 4px;
      margin: 10px 0 0 10px;
      cursor: pointer;
      &.add {
        // background: rgb(70, 155, 235);
        // border-color: rgb(50 138 222);
        background: #000;
        border-color: #000;
        color: #fff;
      }
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.6;
      }
    }
  }

  .input-area {
    div {
      display: flex;
      align-items: center;
      &:first-child {
        margin-bottom: 5px;
      }
      p {
        width: 80px;
        font-size: 14px;
        margin: 0;
      }
      input {
        flex-grow: 1;
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 26px;
        padding: 0 10px;
      }
    }
  }
`