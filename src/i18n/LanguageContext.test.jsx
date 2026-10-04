import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../App';
import {buildProjectBrief} from '../components/company/EnquiryWizard';

beforeEach(() => {
  localStorage.clear();
  window.location.hash = '';
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});
test.each([
  ['et', 'Veebilehe keel', 'Jätka', 'Ettevõtte nimi (valikuline)', 'Räägi oma projektist', 'Vaata kirjeldus üle', 'Funktsioonid'],
  ['ru', 'Язык сайта', 'Далее', 'Название компании (необязательно)', 'Расскажите о проекте', 'Проверить описание', 'Функции'],
  ['fi', 'Sivuston kieli', 'Jatka', 'Yrityksen nimi (valinnainen)', 'Kerro projektistasi', 'Tarkista kuvaus', 'Toiminnot'],
])('switching to %s preserves enquiry state and translates every stage', (code,label,next,business,notes,review,features) => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Business name (optional)'), {target:{value:'Example OÜ'}});
  fireEvent.click(screen.getByLabelText('Website Launch'));
  fireEvent.change(screen.getByRole('combobox',{name:'Website language'}),{target:{value:code}});
  expect(document.documentElement.lang).toBe(code);
  expect(localStorage.getItem('toimu-language')).toBe(code);
  expect(screen.getByLabelText(business)).toHaveValue('Example OÜ');
  fireEvent.click(screen.getByRole('button',{name:next}));
  const checkboxes=screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);
  fireEvent.click(screen.getByRole('button',{name:next}));
  const inputs=screen.getByRole('button',{name:review}).closest('form').querySelectorAll('input');
  fireEvent.change(inputs[0],{target:{value:'Visitor'}});
  fireEvent.change(inputs[1],{target:{value:'visitor@example.com'}});
  fireEvent.change(screen.getByLabelText(notes),{target:{value:'Keep my original project notes.'}});
  fireEvent.click(screen.getByRole('button',{name:review}));
  expect(screen.getByText(features)).toBeInTheDocument();
  expect(screen.getByText('Keep my original project notes.')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox',{name:label}),{target:{value:'en'}});
  expect(screen.getByText('Website Launch', {selector: '.enquiry-review dd'})).toBeInTheDocument();
  expect(screen.getByText('Appointment booking')).toBeInTheDocument();
  expect(screen.queryByText('Budget')).not.toBeInTheDocument();
});
test('a saved language applies to legal pages on a new visit', () => {
  localStorage.setItem('toimu-language','et');
  window.location.hash='#/legal/cookies';
  render(<App />);
  expect(screen.getByRole('heading',{level:1,name:'Küpsiste kasutamine'})).toBeInTheDocument();
  expect(screen.getByText(/Keelevaliku meeldejätmiseks/)).toBeInTheDocument();
  expect(document.title).toContain('Küpsiste kasutamine');
});
test.each(['et','ru','fi'])('the %s email translates selected options without changing visitor data', language => {
  const brief=buildProjectBrief({name:'Visitor',email:'visitor@example.com',business:'Original OÜ',industry:'My industry',website:'https://example.com',service:'Website Launch',features:['Online payments'],timing:'Within 1 month',message:'Original notes'},language);
  expect(brief).toContain('Original OÜ');
  expect(brief).toContain('Original notes');
  expect(brief).toContain('https://example.com');
  expect(brief).not.toContain('Online payments');
  expect(brief).not.toContain('Within 1 month');
  expect(brief).not.toContain('Budget');
});
