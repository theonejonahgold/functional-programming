import { anyPass, clone, filter, isEmpty, length, pipe, reduce } from 'ramda'
import { validArrayIndex } from '../../modules/arrayNumber.js'
import { filterInvalidStringOccurenceTuples } from '../../modules/occurenceTuple.js'
import { arrayValueContainsString } from '../../modules/stringArray.js'
import { reduceArrayValuesToOccurenceAmount } from '../../utilities/array.js'
import { returnFuncIfTrue } from '../../utilities/function.js'
import {
  filterStringIncludedInArray,
  stringIsNumber,
} from '../../utilities/strings.js'
import { getType } from '../../utilities/type.js'

export const validPets = [
  'kat',
  'hond',
  'vogel',
  'vis',
  'kat',
  'rat',
  'konijn',
  'hamster',
  'kip',
  'cavia',
  'gup',
  'katten',
  'vissen',
  'vogels',
  'puma',
  'goudvis',
]

export const petLookUpTable = {
  dwerg: 'hond',
  teckel: '',
  sluierstaartgoudvis: 'goudvis',
  kater: 'kat',
  hont: 'hond',
  poes: 'kat',
  guppen: 'vissen',
  chihuahua: 'hond',
}

export const irrelevantValues = ['Moeder', 'Vader']

export const filterStringOnValidPets: (
  str: string
) => boolean = filterStringIncludedInArray(validPets)

const parsePetAmount: (acc: PetData, curr: string) => PetData = (acc, curr) => {
  let { amount } = acc
  const numberedCurr = Number(curr)

  const i = length(amount) - 1

  if (validArrayIndex(i) && amount[i][1] < 1) amount[i][1] = numberedCurr
  else amount.push(['', numberedCurr])

  return { ...acc, amount }
}

const parsePetSpecies: (acc: PetData, curr: string) => PetData = (
  acc,
  curr
) => {
  let { amount, names } = acc

  const i = length(names) - 1

  if (validArrayIndex(i) && !names[i][0]) names[i][0] = curr
  else names.push([curr, ''])

  amount = reduceArrayValuesToOccurenceAmount(amount, curr)

  return { amount, names }
}

const parsePetName: (acc: PetData, curr: string) => PetData = (acc, curr) => {
  let { names } = acc

  const i = length(names) - 1

  if (validArrayIndex(i) && !names[i][1]) names[i][1] = curr
  else names.push(['', curr])

  return { ...acc, names }
}

const isPetName = (str: string) =>
  !anyPass([stringIsNumber, arrayValueContainsString(validPets)])(str)

export const petReducer: (
  initial: PetData
) => (arr: string[]) => PetData = initial =>
  reduce(
    (acc, curr) =>
      returnFuncIfTrue(stringIsNumber(curr))(
        parsePetAmount,
        clone(acc),
        curr
      ) ||
      returnFuncIfTrue(arrayValueContainsString(validPets)(curr))(
        parsePetSpecies,
        clone(acc),
        curr
      ) ||
      returnFuncIfTrue(isPetName(curr))(parsePetName, clone(acc), curr) ||
      clone(acc),
    initial
  )

const petTupleNameIsValid: (tup: PetTuple) => boolean = tup => !isEmpty(tup[1])

const petTupleSpeciesIsValid: (tup: PetTuple) => boolean = tup =>
  !isEmpty(tup[0])

const filterInvalidPetTuple: (tups: PetTuple[]) => PetTuple[] = pipe(
  filter(petTupleSpeciesIsValid),
  filter(petTupleNameIsValid)
)

export const filterInvalidPetValues = (data: PetData | string) =>
  getType(data) === 'string'
    ? data
    : {
        names: filterInvalidPetTuple((data as PetData).names),
        amount: filterInvalidStringOccurenceTuples((data as PetData).amount),
      }