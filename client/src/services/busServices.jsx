const buses = [
  { id: 1, name: 'Bus A', origin: 'City X', destination: 'City Y', fare: 500 },
  { id: 2, name: 'Bus B', origin: 'City X', destination: 'City Y', fare: 450 },
];

const busService = {
  searchBuses: async (origin, destination, date) => {
    // Simulate API call
    return buses.filter(
      (bus) =>
        bus.origin === origin && bus.destination === destination
    );
  },
};

export default busService;
