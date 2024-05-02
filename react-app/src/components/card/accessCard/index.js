import React, {useEffect, useState} from 'react'
import {Button, Input, UserCardList, Text} from '../../index'
import {useNavigate } from 'react-router-dom';
import * as Styles from './style'
import { CheckBox } from '../userCard/style';
import { Flex } from '../../../style';
import api from '../../../services/pythonApi';

const randomInputs = [
    {
        id: 1,
        name: 'Luana java',
        bornIn: '2009-18-09',
        email: 'email@gmail.com',
        password: 'test',
        receiveEmail: true,
        receiveSMS: true
    },
    {
        id: 2,
        name: 'Rodolfo css',
        bornIn: '2003-28-10',
        email: 'email@gmail.com',
        password: 'test',
        receiveEmail: false,
        receiveSMS: false
    },
    {
        id: 3,
        name: 'Maria React',
        bornIn: '1995-05-20',
        email: 'maria@gmail.com',
        password: 'password123',
        receiveEmail: true,
        receiveSMS: false
    },
    {
        id: 4,
        name: 'José Python',
        bornIn: '1980-12-15',
        email: 'jose@gmail.com',
        password: '123456',
        receiveEmail: false,
        receiveSMS: true
    },
    {
        id: 5,
        name: 'Ana JavaScript',
        bornIn: '2000-08-07',
        email: 'ana@gmail.com',
        password: 'abcdef',
        receiveEmail: true,
        receiveSMS: true
    }
];


export function AccessCard() {
    const [userList, setUserList] = useState([]);

    const [isRegister,setIsRegister] = useState(false)
    const [name, setName] = useState('');
    const [bornIn, setBornIn] = useState('');
    const [email, setEmail] = useState('');
    const [receiveEmail, setReceiveEmail] = useState(false);
    const [receiveSMS, setReceiveSMS] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
          const response = await api.get("/user");
          const users = response.data.userList;
          setUserList(users);
          console.log(users);
        } catch (error) {
          console.error("Erro ao fazer a solicitação à API:", error);
        }
    }

    const generateRandomInputs = () => {
        let indexUser = Math.floor(Math.random() * randomInputs.length);
        setName(`${randomInputs[indexUser].name}`);
        console.log()
        setBornIn(randomInputs[indexUser].bornIn);
        setEmail(randomInputs[indexUser].email);
        setReceiveEmail(randomInputs[indexUser].receiveEmail);
        setReceiveSMS(randomInputs[indexUser].receiveSMS);
        setPassword(randomInputs[indexUser].password);
        setConfirmPassword(randomInputs[indexUser].password);
    }

    const RegisterUser = async () => {
        try {
            const newUser = {
                name: name,
                bornIn: bornIn,
                email: email,
                password: password,
                receiveEmail: receiveEmail,
                receiveSMS: receiveSMS
            };
    
            const response = await api.post("/user", newUser);
            console.log("User registered successfully:", response.data);
    
            // Limpar os campos após o cadastro
    
            // Exibir mensagem de sucesso ou redirecionar para outra página
            // Você pode fazer isso usando um estado para controlar a exibição de uma mensagem ou redirecionamento
        } catch (error) {
            console.error("Erro ao cadastrar o usuário:", error.response.data.message);
            // Exibir uma mensagem de erro para o usuário
            // Você pode definir um estado para armazenar a mensagem de erro e exibi-la no componente
        }
        getUser();
    }    
    
    

    const navigate = useNavigate()
    const loginOn = () => {
        setIsRegister(false);
    };
    const loginOff = () => {
        setIsRegister(true);
    };
    // const login = () =>{
    //     navigate('/about-us')
    // }

    return(
            <Styles.Card>
                <Styles.ContentButtonCard>
                    <Styles.UnderButtonCard/>
                    <Styles.ButtonCardLogin isRegister={!isRegister} onClick={loginOn}>Listagem</Styles.ButtonCardLogin>
                    <Styles.ButtonCardRegister isRegister={isRegister} onClick={loginOff}>Cadastro</Styles.ButtonCardRegister>
                </Styles.ContentButtonCard>
                <Styles.Content>
                    <Styles.UserIcon/>
                    {isRegister &&
                        <>
                            <Input name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input name="bornIn" placeholder="Data Nascimento" value={bornIn} onChange={(e) => setBornIn(e.target.value)} />
                            <Input name="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Input name="confirmPassword" type="password" placeholder="Conf. Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <Flex>
                                <Flex/>
                                    <Text text="Email:" bold size={'md'} />
                                    <CheckBox checked={receiveEmail} onChange={(e) => setReceiveEmail(e.target.checked)} />
                                <Flex/>

                                <Flex/>
                                    <Text text="SMS:" bold size={'md'} />
                                    <CheckBox checked={receiveSMS} onChange={(e) => setReceiveSMS(e.target.checked)} />
                                <Flex/>
                            </Flex>
                            <Button text="Cadastrar" onClick={RegisterUser} />
                            <Button text="Generate Inputs" onClick={generateRandomInputs} />
                        </>
                    }
                    {!isRegister &&
                        <>
                            <UserCardList list={userList}/>
                        </>
                    }
                </Styles.Content>
            </Styles.Card>
    )
}