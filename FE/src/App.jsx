import './App.css';
import AppRouter from './router/index.jsx';
import { ToastContainer } from 'react-toastify'; // Import thư viện
import 'react-toastify/dist/ReactToastify.css'; // Import CSS để thông báo có màu sắc

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}
export default App;