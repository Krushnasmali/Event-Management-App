// statesAndCities.js - Indian states and cities data

export const STATES_AND_CITIES = {
  'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Bhavnagar', 'Anand'],
  'Haryana': ['Gurgaon', 'Hisar', 'Faridabad', 'Rohtak', 'Panipat', 'Ambala'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan', 'Kangra', 'Kullu'],
  'Jharkhand': ['Ranchi', 'Dhanbad', 'Giridih', 'Hazaribagh', 'Bokaro'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Tumkur'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Kollam', 'Ernakulam'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Kolhapur'],
  'Manipur': ['Imphal', 'Bishnupur', 'Thoubal'],
  'Meghalaya': ['Shillong', 'Tura', 'Nongstoin'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Balasore'],
  'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
  'Sikkim': ['Gangtok', 'Pelling', 'Namchi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruppur'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Ghaziabad'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Almora'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Asansol', 'Durgapur'],
  'Delhi': ['New Delhi', 'Central Delhi', 'East Delhi', 'West Delhi', 'South Delhi'],
  'Puducherry': ['Puducherry', 'Yanam', 'Mahe', 'Karaikal'],
  'Ladakh': ['Leh', 'Kargil'],
  'Jammu & Kashmir': ['Srinagar', 'Jammu', 'Leh', 'Anantnag'],
};

export const getAllStates = () => Object.keys(STATES_AND_CITIES).sort();

export const getCitiesForState = (state) => {
  return STATES_AND_CITIES[state] || [];
};
