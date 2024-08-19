import React, { useState } from "react";

export default function ContactsList() {
    const [contacts, setContacts] = useState([
        { name: "John Doe", phone: "123-456-7890", description: "Friend" },
        { name: "Jane Doe", phone: "000-555-999", description: "Family" },
    ]);
    const [newContact, setNewContact] = useState({ name: "", phone: "", description: "" });
    const [editingIndex, setEditingIndex] = useState(null); // Track which contact is being edited
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage pop-up visibility
    const [searchTerm, setSearchTerm] = useState(""); // Track search input

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewContact(contact => ({
            ...contact,
            [name]: value
        }));
    }

    function addOrEditContact() {
        // Validate name and phone number
        if (!newContact.name || !newContact.phone) {
            alert("Please fill the name and phone number.");
            return;
        }

        if (editingIndex !== null) {
            const updatedContacts = [...contacts];
            updatedContacts[editingIndex] = newContact;
            setContacts(updatedContacts);
            setEditingIndex(null);
        } else {
            setContacts(contacts => [...contacts, newContact]);
        }
        setNewContact({ name: "", phone: "", description: "" });
        setIsPopupOpen(false);
    }

    function deleteContact() {
        setContacts(contacts.filter((_, i) => i !== editingIndex));
        closePopup();
    }

    function editContact(index) {
        setNewContact(contacts[index]);
        setEditingIndex(index);
        setIsPopupOpen(true);
    }

    function openAddContactPopup() {
        setNewContact({ name: "", phone: "", description: "" });
        setEditingIndex(null);
        setIsPopupOpen(true);
    }

    function closePopup() {
        setIsPopupOpen(false);
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleCallClick(event) {
        event.stopPropagation();
    }
    function handleSmsClick(event) {
        event.stopPropagation();
    }
    //In this project Call and SMS buttons are inactive.

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contact-list">
            <div className="header">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="add-contact-button" onClick={openAddContactPopup}>+</button>
            </div>

            <ol>
                {filteredContacts.map((contact, index) =>
                    <li key={index}>
                        <div className="contact" onClick={() => editContact(index)}>
                            <div className="contact-info">
                                <p className="contact-name">{contact.name}</p>
                                <p className="contact-description">{contact.description}</p>
                            </div>
                            <div className="contact-actions">
                                <button className="call-button" onClick={handleCallClick}><i className='bx bxs-phone-call'></i></button>
                                <button className="sms-button" onClick={handleSmsClick}><i className='bx bxs-message-dots'></i></button>
                            </div>
                        </div>
                    </li>
                )}
            </ol>

            {/* Display popup when adding or editing a contact */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>{editingIndex !== null ? "Edit Contact" : "Add Contact"}</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name..."
                            value={newContact.name}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number..."
                            value={newContact.phone}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Enter contact description..."
                            value={newContact.description}
                            onChange={handleInputChange}
                        />

                        <button onClick={addOrEditContact}>
                            {editingIndex !== null ? "Save Contact" : "Add Contact"}
                        </button>
                        {editingIndex !== null && (
                            <button onClick={deleteContact}>Delete Contact</button>
                        )}
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
