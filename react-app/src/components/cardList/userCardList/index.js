import React, { useState } from 'react';
import {ContentIcon, LoadingIcon} from '../../../style';
import * as Styled from './style';
import { UserCard } from '../../index';

export function UserCardList({ list }) {//type

  if (list.length === 0) {
    console.log(list);
    return <>
      <ContentIcon>
        <LoadingIcon/>
      </ContentIcon>
    </>
  }
  return (
    <Styled.Cards>
      {list.map((item, index) => (
        <UserCard
            key={index}
            list={item}
            // type={type}
        />
      ))}
    </Styled.Cards>
  );
}
