import { TaxiResponseJSON, validateJSON } from "./runtimeValidators";

describe('Test validation function', () => {
  it('correct json', () => {
    const exampleTaxiJSON = {
      "pickup_eta": 1,
      "drivers": [
        {
          "driver_id": "0-qcqnhm5ety",
          "location": {
            "latitude": 1.2807098901967118,
            "longitude": 103.8666018215676,
            "bearing": 173
          }
        }
      ],
    }
    const result = validateJSON(exampleTaxiJSON, TaxiResponseJSON);

    expect(result).toBe(true);   
  })

  it('missing longitude', () => {
    const exampleTaxiJSON = {
      "pickup_eta": 1,
      "drivers": [
        {
          "driver_id": "0-qcqnhm5ety",
          "location": {
            "latitude": 1.2807098901967118,
            "bearing": 173
          }
        },
      ]
    }
    const result = validateJSON(exampleTaxiJSON, TaxiResponseJSON);
    expect(result).toBe(false);   
  })

  it('empty driver', () => {
    const exampleTaxiJSON = {
      "pickup_eta": 1,
      "drivers": []
    }
    const result = validateJSON(exampleTaxiJSON, TaxiResponseJSON);
    expect(result).toBe(true);   
  })

  it('latitude is string', () => {
    const exampleTaxiJSON = {
      "pickup_eta": 1,
      "drivers": [
        {
          "driver_id": "0-qcqnhm5ety",
          "location": {
            "latitude": '1.2807098901967118',
            "longitude": 103.8666018215676,
            "bearing": 173
          }
        },
      ]
    }
    const result = validateJSON(exampleTaxiJSON, TaxiResponseJSON);
    expect(result).toBe(false);   
  })
});
