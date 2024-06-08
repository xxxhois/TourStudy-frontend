import { Carousel, Form, } from 'antd';
import './Slides.css';
import { useState, useEffect } from 'react';
import { AIGCrequest } from '../../utils/AIGCrequest';
import { generateDiary } from '../../utils/chatgpt';
import axios from 'axios';

const Slides = ({prompt, input}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const wordsprompt = generateDiary(prompt,input);
    const requestData = {
        prompt: "suzhouyuanlin,no humans,garden,Building details,facade details,water,tree,white wall,out doors,"+wordsprompt,
        negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, UnrealisticDream",
        steps: 20,
        cfg_scale: 7,
        width: 512,
        height: 640,
        sampler_index: "Euler a",
        n_iter: 4,
        model: "xsmerge_v3lnSafetensor.safetensors[6eb26bbaaf]"
    };
    
    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://10.106.128.107:10041/sdapi/v1/txt2img', requestData, {
                timeout: 60000 // 设置超时时间为 60 秒
            });
            const imageData = response.data.images; // 假设返回的数据包含一个 images 数组
            setImages(imageData);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const contentStyle = {
        height: '300px', // Change the height to your desired value
        width: '500px', // Change the width to your desired value
        color: '#fff',
        lineHeight: '300px', // Adjust the line height to center the content vertically
        textAlign: 'center',
        background: '#364d79',
    };


    return (
        <div className='slides_container'>
            <button onClick={fetchImages} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Images'}
            </button>
            <div>
                <Carousel
                    autoplay
                    autoplaySpeed={1500}
                    className='carousel'
                >
                    {images.map((image, index) => (
                        <div><img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Generated ${index}`} /></div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
export default Slides;