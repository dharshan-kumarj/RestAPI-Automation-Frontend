import Zelerius from '../assets/zelerius.svg';

function UserBar() {
    return (
        <>
            <div className="row bg-dark border-bottom">
                <h6  style={{ color: '#fff' }} className="col">
                    <img src={Zelerius} width="30" height="30" className='me-2 ms-3' alt="Logo" />
                    Zelerius API
                </h6>
                <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img src="https://img.icons8.com/windows/32/FFFFFF/user.png"  style={{ float: 'top' }}  className='me-4' alt="user"/>"
                </div>
            </div>
         
        </>)
}
export default UserBar;


