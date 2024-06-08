import GetDiary from './GetDiary';
import GetSortedDiary from './GetSortedDiary';
import './Diary.css';

const Diary = () => {
    return (
        <div className='diary'>
            <div className='getdiary'><GetDiary /></div>
            <div className='getsorteddiary'><GetSortedDiary /></div>
        </div>
    );
};

export default Diary;