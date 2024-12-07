import Header from '../components/Header.jsx'
import FormsLogin from '../components/FormsLogin.jsx'

function LogarUsuarios({ formData, setFormData }) {
    return (
        <div>
            <Header />
            <FormsLogin formData={formData} setFormData={setFormData} />
        </div>
    );
}

export default LogarUsuarios;