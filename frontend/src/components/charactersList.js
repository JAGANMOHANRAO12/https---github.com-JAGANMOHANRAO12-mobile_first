import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../slices/charactersSlice';

const CharactersList = () => {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters.characters);
  const next = useSelector(state => state.characters.next);
  const previous = useSelector(state => state.characters.previous);

  useEffect(() => {
    dispatch(fetchCharacters(1));
  }, [dispatch]);

  const handleNext = () => {
    const page = new URL(next).searchParams.get('page');
    dispatch(fetchCharacters(page));
  };

  const handlePrevious = () => {
    const page = new URL(previous).searchParams.get('page');
    dispatch(fetchCharacters(page));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious} disabled={!previous}>Previous</button>
      <button onClick={handleNext} disabled={!next}>Next</button>
    </div>
  );
};

export default CharactersList;
