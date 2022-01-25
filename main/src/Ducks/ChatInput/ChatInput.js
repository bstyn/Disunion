import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGitfcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import './ChatInput.css'

function ChatInput() {
  return (
    <div className='chat-input'>
        <AddCircleIcon className='add-circle' />
        <form>
            <input type="text" placeholder='Message #Channel' />
            <button className='chat-input-button'type='submit'>Send Message</button>
        </form>
        <div className="chat-input-icons">
            <CardGitfcardIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
        </div>
    </div>
  );
}

export default ChatInput;
