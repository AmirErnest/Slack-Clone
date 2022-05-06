import React from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';
import {ChatInputIconsData} from '../data/ChatInputIcons'
import {ChatIconsInputData} from '../data/ChatInputIcons'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {useState} from 'react'
import useOnclickOutside from "react-cool-onclickoutside";


function ChatInput({ sendMessage }) {

    const [input, setInput] = useState("");

    /* function to send message with the button send*/
    /* Button passes an event (e) by default. prevent default to prevent the page from refreshing*/
    const send  = (e)=> {
        e.preventDefault();
        if(!input) return;
        sendMessage(input)
    }

    /* close emoji window when clicking outside the emoji window*/
    const closeEmojiWindow = () => SetEmojiPicker(false);
    const ref = useOnclickOutside(() => closeEmojiWindow());

    /* open emoji window when emoji icon is clicked*/
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, SetMessage] = useState("");

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
        <Picker
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={emoji=>SetMessage(message + emoji.native)}
            style={{ position: 'absolute', display: 'inline-block', bottom: '60px', right: '30px' }}
        />
        );
    }

    function triggerPicker(event) {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }

    return (
        <Container ref={ref}> 
            <InputContainer>
                <form>
                    <input 
                        onChange={(event)=>SetMessage(event.target.value)} 
                        type="text" 
                        placeholder="Message here..."  
                        value={message}
                    />
                </form>
                <IconsContainer >
                    <LeftIcons>
                        {
                        ChatInputIconsData.map(item => (
                            <LeftIconsItem>
                                {item.icon}
                            </LeftIconsItem>
                        ))
                        }
                    </LeftIcons>
                    <RightIcons>
                        {
                        ChatIconsInputData.map(item => (
                            <RightIconsItem>
                                {item.icon}
                            </RightIconsItem>
                        ))
                        }

                        {emojiPicker}
                        <Emoji onClick={triggerPicker} />
                        
                        <SendButton 
                            type="submit"
                            onClick={send}>
                            <Send />
                        </SendButton>
                    </RightIcons>
                </IconsContainer>
            </InputContainer>
        </Container>
    );
}

export default ChatInput


const Container = styled.div`
    padding-left:20px;
    padding-right: 20px;
    padding-bottom: 24px;
`;

const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;

    form {
        display: flex; 
        height: 42px; 
        align-items: center;
        padding-left: 10px;
        input {
            flex: 1;
            border: none;
            font-size: 13px;
        }
        input:focus{
            outline: none;
        }
    }
`;

const IconsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: rgba(var(--sk_foreground_min_solid,248,248,248),1);
    border-top: 1px solid rgba(83, 39, 83, .13); 
    overflow: visible;
`;

const LeftIcons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LeftIconsItem = styled.div`
    border-radius: 2px;
    width: 32px;
    height: 32px; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    color: #606060;
`;

const RightIcons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightIconsItem = styled.div`
    border-radius: 2px;
    width: 32px;
    height: 32px; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    color: #606060;
    
`;

const Emoji = styled(EmojiEmotionsIcon)`
    border-radius: 2px;
    width: 32px;
    height: 32px; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    color: #606060;
`;

const SendButton = styled.div`
    background: #007a5a;
    border-radius: 2px;
    width: 32px;
    height: 32px; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer;
    border: none;

    .MuiSvgIcon-root {
        width: 18px;
    }

    :hover {
        background: #148567;
    }
`;

const Send = styled(SendIcon)`
    color: #D9D9D9;
`;