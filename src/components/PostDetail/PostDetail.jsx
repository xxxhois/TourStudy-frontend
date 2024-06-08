import { Rate, message } from 'antd';
import { request } from '../../utils/request';
import { useEffect,useState } from 'react';

const PostDetail = ({ diary, diaries, setDiaries }) => {
    const [tags,setTags] = useState([]);
    const postRate = (value) => {
        request.post('/diary/add_score', { 
            username: diary.username,
            title: diary.title,
            score: value*2
         })
            .then(response => {
                if(response.data.code===200) {
                    message.success('评分成功！');
                  } else {
                    message.error(response.data.msg);
                  }
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        request.post('/tag/get_tags_by_diary', {
            username: diary.username,
            title: diary.title
        })
            .then(response => {
                if(response.data.code===200) {
                    const tagNames = response.data.data.map(tag => tag.name);
                    setTags(tagNames);
                    //message.success('获取标签成功！');
                  } else {
                    message.error(response.data.msg);
                  }
            })
            .catch(error => {
                console.log(error);
            });
    }, [diary]);
    return (
        <div className="post_detail">
            <h1>{diary.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: diary.content }}></div>
            <p>created by:{diary.username}</p>
            <p>当前评分：{diary.score}</p>
            <div>{tags.map(
                tag => <label style={{ color: 'blue' }}>#{tag} </label>
            )}</div>
            <Rate onChange={(value)=>postRate(value)} allowHalf defaultValue={2.5} />

        </div>
    );
}

export default PostDetail;