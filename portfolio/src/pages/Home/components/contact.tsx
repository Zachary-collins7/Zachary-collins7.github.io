import * as React from 'react';
import './contact.scss';

export interface IContactFormProps {
}

export default function ContactForm(props: IContactFormProps) {
    return (
        <div className="wrapper">
            <div className="form-box">
                <h2>Let's create somthing</h2>

                <form>
                    <div className="input-group">
                        <div className="input-box">
                            <input type="text" name="name" id="name" placeholder="name" required />
                            <label htmlFor="name" data-error-msg="name is invalid">name</label>
                        </div>

                        <div className="input-box">
                            <input type="email" name="email" id="email" placeholder="email" required />
                            <label htmlFor="email" data-error-msg="email is invalid">email</label>
                        </div>
                    </div>

                    <div className="input-box">
                        <input type="text" name="message" id="message" placeholder="message" required />
                        <label htmlFor="message" data-error-msg="message is invalid">message</label>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
