import { Rate, message } from 'antd'
import { request } from '../../utils/request';
import { useEffect, useState } from 'react';

const TourismDetail = ({ tourism }) => {
    const [tags,setTags] = useState([]);
    useEffect(() => {
        request.post('/tag/get_tags_by_tourism', {
            tourism: tourism.name
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
    }, [tourism]);
    const pic = require('./pic.txt');
    const postRate = (value) => {
        request.post('/map/add_score', { 
            name: tourism.name,
            score: value*2
         })
            .then(response => {
                if(response.data.code===200) {
                    message.success('评分成功！');
                    // setDiaries(diaries.map(d =>
                    //     d.title === diary.titl } : d
                    // ));
                  } else {
                    message.error(response.data.msg);
                  }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className='tourism-detail'>
            <img src={pic} alt="景点图片" />
            <h1>{tourism.name}</h1>
            <label>总浏览量：{tourism.views}</label>
            <div dangerouslySetInnerHTML={{ __html: tourism.description }}></div>
            <div>{tags.map(
                tag => <label style={{ color: 'blue' }}>#{tag} </label>
            )}</div>
            <Rate onChange={(value)=>postRate(value)} allowHalf defaultValue={2.5} />
            <label>评分人数:{tourism.ratings}</label>
        </div>
    );
};


export default TourismDetail;