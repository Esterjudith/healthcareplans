'use client'
import { useState } from "react";
import { jsPDF } from "jspdf"
import { supabase } from "@/supabase";

const Proposal = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender,setGender] = useState('')
    const [plans, setPlans] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (age < 18) {
            setErrorMessage('You must be over 18 years old.')
            return;
        }

        const premiums = calculatePremiums(age)
        setPlans(premiums)
        generatePDF(premiums)
    }

    const calculatePremiums = (age) => {
        let premiums = [];

        switch (true) {
            case age >= 18 && age <= 24:
                premiums = [150, 200, 250];
                break;
            case age >= 25 && age <= 34:
                premiums = [250, 300, 350];
                break;
            case age >= 35 && age <= 64:
                premiums = [350, 400, 450];
                break;
            case age >= 65:
                premiums = [450, 500, 550];
                break;
            default:
                premiums = [];
        }

        return premiums;
    };

    const generatePDF = (premiums) => {
        const doc = new jsPDF();
        const planNames = ['Bronze', 'Silver', 'Gold'];

        doc.setFontSize(12);
        doc.text('Name: ' + name, 10, 10);
        doc.text('Age: ' + age, 10, 20);

        premiums.forEach((premium, index) => {
            const planName = planNames[index];
            doc.text(planName + ' Plan Premium: $' + premium, 10, 40 + index * 10);
        });

        doc.save('proposal.pdf');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit">Submit</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Proposal