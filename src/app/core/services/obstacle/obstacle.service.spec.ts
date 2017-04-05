/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ObstacleService} from './obstacle.service.ts';

describe('Service: FirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObstacleService]
    });
  });

  it('should ...', inject([ObstacleService], (service: ObstacleService) => {
    expect(service).toBeTruthy();
  }));
});
