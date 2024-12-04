import Header from '../components/Header.jsx'
import FormsUser from '../components/FormsUser.jsx'

function CriarUsuarios({ formData, setFormData }) {
    return (
        <div>
            <Header />
            <FormsUser formData={formData} setFormData={setFormData} />
        </div>
    );
}

export default CriarUsuarios;