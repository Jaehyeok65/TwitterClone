import React,{ useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from "../mybase";


const Create = ( { user }) => {
    const [file,setFile] = useState(null);
    const [hweet,setHweet] = useState('');

    const onChange = (e) => {
        const { value } = e.target;
        setHweet((prev) => value);
      }
    
      const onFileChange = (e) => {
        const { files } = e.target;
        const thefile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(thefile);
        reader.onloadend = (event) => {
          setFile(event.currentTarget.result);
        }
      }
    
      const onClear = () => {
        setFile(null);
      }
    
    
      const onSubmit = async(e) => {
        e.preventDefault();
        if(hweet === '') { //input창에 아무 텍스트도 입력하지 않았다면 전송되지 않음.
          return;
        }
        let fileurl = '';
        if(file !== null) { //만약 파일이 null이 아니라면 == 이미지가 첨부되었다면
        const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
        const response = await fileRef.putString(file, 'data_url');
        fileurl = await response.ref.getDownloadURL();
        }
        if(hweet === '') {
          return;
        }
        await dbService.collection('hweets').add( {
          text : hweet,
          created : Date.now(),
          creatorid : user.uid,
          fileurl
        })
        setHweet(prev => '');
        setFile(null);
      }

    return (
        <>
        <form onSubmit={onSubmit}>
        <input type='text' value = {hweet} onChange = {onChange}  maxLength={120} placeholder='typing pleaze...'/>
        <input type='file' accept='img/*' name = 'img' onChange={onFileChange} />
        <input type='submit' value='Hweet' />
        <br/>
        { file && (<>
        <img src={file} width='100px' height='100px' alt='없음'/>
        <button onClick={onClear}>clear</button>
        </>)}
      </form>

        
        </>
    )
}

export default Create;