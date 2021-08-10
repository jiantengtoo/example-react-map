import { isRight } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

export const validateJSON = <T>(input:any, t:t.Type<T>):boolean => {
  const result = t.decode(input);
  if (isRight(result)) {
    return true;
  }

  return false;
}

export const TaxiResponseJSON = t.type({
  pickup_eta: t.number,
  drivers: t.array(
    t.type({
      driver_id: t.string,
      location: t.type({
        latitude: t.number,
        longitude: t.number,
        bearing: t.number,
      })
    })
  )
})

export const ENDPOINT_VALIDATOR = [
  {
    url: 'https://qa-interview-test.splytech.dev/api/drivers',
    method: 'get',
    validator: TaxiResponseJSON
  }
]