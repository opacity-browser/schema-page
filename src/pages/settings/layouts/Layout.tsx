import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import General from '../components/General'
import SearchHistory from '../components/SearchHistory'
import VisitHistory from '../components/VisitHistory'
import Permission from '../components/Permission'
import { useDialogMessagesStates } from '../hooks/DialogMessages'
import ErrorMessageDialog from '../components/DialogMessage'

const menuList = [{
  name: "General",
  link: "#general"
}, {
  name: "Search History",
  link: "#search-history"
}, {
  name: "Visit History",
  link: "#visit-history"
}, {
  name: "Permission",
  link: "#permission"
}]

export default () => {
  const [pageName, setPageName] = useState<string>(location.hash || menuList[0].link)
  const [messages, setMessages] = useDialogMessagesStates()

  useEffect(() => {
    if(messages.length > 0 && !messages.find(em => em.isActive)) {
      setMessages([])
    }
  }, [messages])

  return (
    <$area>
      <Sidebar pageName={pageName} setPageName={setPageName} menuList={menuList} />    
      <$content>
        {pageName == "#general" && (
          <General />
        )}
        {pageName == "#search-history" && (
          <SearchHistory />
        )}
        {pageName == "#visit-history" && (
          <VisitHistory />
        )}
        {pageName == "#permission" && (
          <Permission />
        )}
      </$content>
      {messages.length > 0 && (
        <$dialogArea>
          {messages.map(({isActive, message}, i) => (
            <ErrorMessageDialog key={i} isActive={isActive} message={message} index={i} />
          ))}
        </$dialogArea>
      )}
    </$area>
  )
}

const $area = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 1000px;
`

const $content = styled.div`
  flex-grow: 1
`

const $dialogArea = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
`