import { LatLng } from "leaflet";
import { OFFICE_LOCATIONS } from "./OfficeLocation";
import { distance, findNearestOffice } from "./Util";

describe('Test distance function', () => {
  it('test 1', () => {
    const result = distance(
      1.285194,
      103.8522982,
      51.5049375,
      -0.0964509,
    )
    
    expect(Math.round(result * 100) / 100).toBe(6743.96);   
  })
});

describe('Test nearest office', () => {
  const johor = new LatLng(1.4675579125811296, 103.76087549265664);
  const paris = new LatLng(48.85662766577185, 2.3503323526762716);

  it('test 1', () => {
    const result = findNearestOffice(johor, OFFICE_LOCATIONS);
    
    expect(result).toBe('SG');   
  })

  it('test 2', () => {
    const result = findNearestOffice(paris, OFFICE_LOCATIONS);
    
    expect(result).toBe('LDN');   
  })
});
