import Header from '../components/Header.jsx'
import FormsCadastroAtividade from '../components/FormsCadastroAtividade.jsx'

function CriarAtividades({ formData, setFormData }) {
    return (
        <div>
            <Header />
            <FormsCadastroAtividade formData={formData} setFormData={setFormData} />
        </div>
    );
}

export default CriarAtividades;