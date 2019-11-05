setConfig();
getLogin();

function takePixel(pixel)
{
    profile = getLocalStorageByName('profile');
    if(profile.points > 0) {
        profile.points = profile.points - 1;
        setLocalStorageByName('profile', profile);
        return true;
    }
    return false;
}