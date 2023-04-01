export const saveSettings= async (settings) => {
    const response = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
    });
    return await response.json();
    };

export const fetchSettings = async () => {
    const response = await fetch('http://localhost:3000/api/settings');
    const data = await response.json();
    return data;
    }
    
export const saveModSettings = async (formattedSettings) => {
const response = await fetch('http://localhost:3000/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formattedSettings,
});
const data = await response.json();
return data;
};

