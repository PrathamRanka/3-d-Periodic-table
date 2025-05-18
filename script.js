import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// symbol, name, atomic mass, col, row, property
const table = [
["H", "Hydrogen", "1.008", 1, 1, "Nonmetal"],
["He", "Helium", "4.0026", 18, 1, "Noble Gas"],
["Li", "Lithium", "6.94", 1, 2, "Alkali Metal"],
["Be", "Beryllium", "9.0122", 2, 2, "Alkaline Earth Metal"],
["B", "Boron", "10.81", 13, 2, "Metalloid"],
["C", "Carbon", "12.011", 14, 2, "Nonmetal"],
["N", "Nitrogen", "14.007", 15, 2, "Nonmetal"],
["O", "Oxygen", "15.999", 16, 2, "Nonmetal"],
["F", "Fluorine", "18.998", 17, 2, "Halogen"],
["Ne", "Neon", "20.180", 18, 2, "Noble Gas"],
["Na", "Sodium", "22.990", 1, 3, "Alkali Metal"],
["Mg", "Magnesium", "24.305", 2, 3, "Alkaline Earth Metal"],
["Al", "Aluminium", "26.982", 13, 3, "Post-transition Metal"],
["Si", "Silicon", "28.085", 14, 3, "Metalloid"],
["P", "Phosphorus", "30.974", 15, 3, "Nonmetal"],
["S", "Sulfur", "32.06", 16, 3, "Nonmetal"],
["Cl", "Chlorine", "35.45", 17, 3, "Halogen"],
["Ar", "Argon", "39.948", 18, 3, "Noble Gas"],
["K", "Potassium", "39.098", 1, 4, "Alkali Metal"],
["Ca", "Calcium", "40.078", 2, 4, "Alkaline Earth Metal"],
["Sc", "Scandium", "44.956", 3, 4, "Transition Metal"],
["Ti", "Titanium", "47.867", 4, 4, "Transition Metal"],
["V", "Vanadium", "50.942", 5, 4, "Transition Metal"],
["Cr", "Chromium", "51.996", 6, 4, "Transition Metal"],
["Mn", "Manganese", "54.938", 7, 4, "Transition Metal"],
["Fe", "Iron", "55.845", 8, 4, "Transition Metal"],
["Co", "Cobalt", "58.933", 9, 4, "Transition Metal"],
["Ni", "Nickel", "58.693", 10, 4, "Transition Metal"],
["Cu", "Copper", "63.546", 11, 4, "Transition Metal"],
["Zn", "Zinc", "65.38", 12, 4, "Transition Metal"],
["Ga", "Gallium", "69.723", 13, 4, "Post-transition Metal"],
["Ge", "Germanium", "72.630", 14, 4, "Metalloid"],
["As", "Arsenic", "74.922", 15, 4, "Metalloid"],
["Se", "Selenium", "78.971", 16, 4, "Nonmetal"],
["Br", "Bromine", "79.904", 17, 4, "Halogen"],
["Kr", "Krypton", "83.798", 18, 4, "Noble Gas"],
["Rb", "Rubidium", "85.468", 1, 5, "Alkali Metal"],
["Sr", "Strontium", "87.62", 2, 5, "Alkaline Earth Metal"],
["Y", "Yttrium", "88.906", 3, 5, "Transition Metal"],
["Zr", "Zirconium", "91.224", 4, 5, "Transition Metal"],
["Nb", "Niobium", "92.906", 5, 5, "Transition Metal"],
["Mo", "Molybdenum", "95.95", 6, 5, "Transition Metal"],
["Tc", "Technetium", "[98]", 7, 5, "Transition Metal"],
["Ru", "Ruthenium", "101.07", 8, 5, "Transition Metal"],
["Rh", "Rhodium", "102.91", 9, 5, "Transition Metal"],
["Pd", "Palladium", "106.42", 10, 5, "Transition Metal"],
["Ag", "Silver", "107.87", 11, 5, "Transition Metal"],
["Cd", "Cadmium", "112.41", 12, 5, "Transition Metal"],
["In", "Indium", "114.82", 13, 5, "Post-transition Metal"],
["Sn", "Tin", "118.71", 14, 5, "Post-transition Metal"],
["Sb", "Antimony", "121.76", 15, 5, "Metalloid"],
["Te", "Tellurium", "127.60", 16, 5, "Metalloid"],
["I", "Iodine", "126.90", 17, 5, "Halogen"],
["Xe", "Xenon", "131.29", 18, 5, "Noble Gas"],
["Cs", "Cesium", "132.91", 1, 6, "Alkali Metal"],
["Ba", "Barium", "137.33", 2, 6, "Alkaline Earth Metal"],
["La", "Lanthanum", "138.91", 3, 6, "Lanthanide"],
["Ce", "Cerium", "140.12", 4, 9, "Lanthanide"],
["Pr", "Praseodymium", "140.91", 5, 9, "Lanthanide"],
["Nd", "Neodymium", "144.24", 6, 9, "Lanthanide"],
["Pm", "Promethium", "[145]", 7, 9, "Lanthanide"],
["Sm", "Samarium", "150.36", 8, 9, "Lanthanide"],
["Eu", "Europium", "151.96", 9, 9, "Lanthanide"],
["Gd", "Gadolinium", "157.25", 10, 9, "Lanthanide"],
["Tb", "Terbium", "158.93", 11, 9, "Lanthanide"],
["Dy", "Dysprosium", "162.50", 12, 9, "Lanthanide"],
["Ho", "Holmium", "164.93", 13, 9, "Lanthanide"],
["Er", "Erbium", "167.26", 14, 9, "Lanthanide"],
["Tm", "Thulium", "168.93", 15, 9, "Lanthanide"],
["Yb", "Ytterbium", "173.05", 16, 9, "Lanthanide"],
["Lu", "Lutetium", "174.97", 17, 9, "Lanthanide"],
["Hf", "Hafnium", "178.49", 4, 6, "Transition Metal"],
["Ta", "Tantalum", "180.95", 5, 6, "Transition Metal"],
["W", "Tungsten", "183.84", 6, 6, "Transition Metal"],
["Re", "Rhenium", "186.21", 7, 6, "Transition Metal"],
["Os", "Osmium", "190.23", 8, 6, "Transition Metal"],
["Ir", "Iridium", "192.22", 9, 6, "Transition Metal"],
["Pt", "Platinum", "195.08", 10, 6, "Transition Metal"],
["Au", "Gold", "196.97", 11, 6, "Transition Metal"],
["Hg", "Mercury", "200.59", 12, 6, "Transition Metal"],
["Tl", "Thallium", "204.38", 13, 6, "Post-transition Metal"],
["Pb", "Lead", "207.2", 14, 6, "Post-transition Metal"],
["Bi", "Bismuth", "208.98", 15, 6, "Post-transition Metal"],
["Po", "Polonium", "[209]", 16, 6, "Post-transition Metal"],
["At", "Astatine", "[210]", 17, 6, "Halogen"],
["Rn", "Radon", "[222]", 18, 6, "Noble Gas"],
["Fr", "Francium", "[223]", 1, 7, "Alkali Metal"],
["Ra", "Radium", "[226]", 2, 7, "Alkaline Earth Metal"],
["Ac", "Actinium", "227", 3, 7, "Actinide"],
["Th", "Thorium", "232.04", 4, 10, "Actinide"],
["Pa", "Protactinium", "231.04", 5, 10, "Actinide"],
["U", "Uranium", "238.03", 6, 10, "Actinide"],
["Np", "Neptunium", "[237]", 7, 10, "Actinide"],
["Pu", "Plutonium", "[244]", 8, 10, "Actinide"],
["Am", "Americium", "[243]", 9, 10, "Actinide"],
["Cm", "Curium", "[247]", 10, 10, "Actinide"],
["Bk", "Berkelium", "[247]", 11, 10, "Actinide"],
["Cf", "Californium", "[251]", 12, 10, "Actinide"],
["Es", "Einsteinium", "[252]", 13, 10, "Actinide"],
["Fm", "Fermium", "[257]", 14, 10, "Actinide"],
["Md", "Mendelevium", "[258]", 15, 10, "Actinide"],
["No", "Nobelium", "[259]", 16, 10, "Actinide"],
["Lr", "Lawrencium", "[266]", 17, 10, "Actinide"],
["Rf", "Rutherfordium", "[267]", 4, 7, "Transition Metal"],
["Db", "Dubnium", "[270]", 5, 7, "Transition Metal"],
["Sg", "Seaborgium", "[271]", 6, 7, "Transition Metal"],
["Bh", "Bohrium", "[270]", 7, 7, "Transition Metal"],
["Hs", "Hassium", "[277]", 8, 7, "Transition Metal"],
["Mt", "Meitnerium", "[278]", 9, 7, "Unknown"],
["Ds", "Darmstadtium", "[281]", 10, 7, "Unknown"],
["Rg", "Roentgenium", "[282]", 11, 7, "Unknown"],
["Cn", "Copernicium", "[285]", 12, 7, "Transition Metal"],
["Uut", "Ununtrium", "[286]", 13, 7, "Unknown"],
["Uuq", "Ununquadium", "[289]", 14, 7, "Post-transition Metal"],
["Uup", "Ununpentium", "[290]", 15, 7, "Unknown"],
["Uuh", "Ununhexium", "[293]", 16, 7, "Unknown"],
["Uus", "Ununseptium", "[294]", 17, 7, "Unknown"],
["Uuo", "Ununoctium", "[294]", 18, 7, "Unknown"]
];

let camera, scene, renderer, controls;
let objects = [];
let targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);

    // Responsive camera distance
    if (window.innerWidth < 500) {
        camera.position.z = 4800;
    } else if (window.innerWidth < 800) {
        camera.position.z = 3800;
    } else {
        camera.position.z = 3000;
    }
    scene = new THREE.Scene();

    // table
    for (let i = 0; i < table.length; i++) {
        const [symbol, name, mass, col, row, property] = table[i];
        const element = document.createElement('div');
        element.className = 'element';
        element.dataset.property = property;

        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = i + 1;
        element.appendChild(number);

        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'symbol';
        symbolDiv.textContent = symbol;
        element.appendChild(symbolDiv);

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = name + '<br>' + mass;
        element.appendChild(details);

        // Hover info
        element.addEventListener('mouseenter', (e) => {
            const hoverInfo = document.getElementById('hoverInfo');
            hoverInfo.innerHTML = `<b>${name} (${symbol})</b><br>Atomic Mass: ${mass}<br>Type: ${property}`;
            hoverInfo.style.display = 'block';
        });
        element.addEventListener('mousemove', (e) => {
            const hoverInfo = document.getElementById('hoverInfo');
            hoverInfo.style.left = (e.clientX + 20) + 'px';
            hoverInfo.style.top = (e.clientY - 10) + 'px';
        });
        element.addEventListener('mouseleave', () => {
            document.getElementById('hoverInfo').style.display = 'none';
        });

        element.addEventListener('click', (e) => {
            e.stopPropagation();
            // Remove focus from all elements
            document.querySelectorAll('.element.focused').forEach(el => el.classList.remove('focused'));
            document.querySelectorAll('.element.blurred').forEach(el => el.classList.remove('blurred'));
            // Focus this element
            element.classList.add('focused');
            // Blur all others
            objects.forEach(obj => {
                if (obj.element !== element) obj.element.classList.add('blurred');
            });
        });

        const object = new CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);
        objects.push(object);

        const target = new THREE.Object3D();
        target.position.x = (col * 140) - 1330;
        target.position.y = - (row * 180) + 990;
        targets.table.push(target);
    }

    // sphere
    let vector = new THREE.Vector3();
    for (let i = 0, l = objects.length; i < l; i++) {
        let phi = Math.acos(-1 + (2 * i) / l);
        let theta = Math.sqrt(l * Math.PI) * phi;
        let object = new THREE.Object3D();
        object.position.setFromSphericalCoords(800, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        targets.sphere.push(object);
    }

    // helix
    vector = new THREE.Vector3();
    for (let i = 0, l = objects.length; i < l; i++) {
        let theta = i * 0.175 + Math.PI;
        let y = - (i * 8) + 450;
        let object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(900, theta, y);
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        targets.helix.push(object);
    }

    // grid
    for (let i = 0; i < objects.length; i++) {
        let object = new THREE.Object3D();
        object.position.x = ((i % 5) * 400) - 800;
        object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
        object.position.z = (Math.floor(i / 25)) * 1000 - 2000;
        targets.grid.push(object);
    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    document.getElementById('table').addEventListener('click', () => transform(targets.table, 2000));
    document.getElementById('sphere').addEventListener('click', () => transform(targets.sphere, 2000));
    document.getElementById('helix').addEventListener('click', () => transform(targets.helix, 2000));
    document.getElementById('grid').addEventListener('click', () => transform(targets.grid, 2000));

    document.getElementById('propertyFilter').addEventListener('change', function () {
        filterElements(this.value);
    });


    transform(targets.table, 2000);
    window.addEventListener('resize', onWindowResize, false);

    // Remove focus/blur when clicking outside any element
    document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('element')) {
            document.querySelectorAll('.element.focused').forEach(el => el.classList.remove('focused'));
            document.querySelectorAll('.element.blurred').forEach(el => el.classList.remove('blurred'));
        }
    });
}

function transform(targets, duration) {
    TWEEN.removeAll();
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        let target = targets[i];
        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }
    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function filterElements(property) {
    for (let i = 0; i < objects.length; i++) {
        const el = objects[i].element;
        if (property === "All" || el.dataset.property === property) {
            // Animate in
            new TWEEN.Tween(objects[i].position)
                .to({ x: targets.table[i].position.x, y: targets.table[i].position.y, z: targets.table[i].position.z }, 800)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
        } else {
            // Animate out (move far away and fade)
            new TWEEN.Tween(objects[i].position)
                .to({ x: 0, y: -4000, z: 0 }, 800)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            el.style.opacity = "0.1";
            el.style.pointerEvents = "none";
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Responsive camera distance
    if (window.innerWidth < 500) {
        camera.position.z = 4800;
    } else if (window.innerWidth < 800) {
        camera.position.z = 3800;
    } else {
        camera.position.z = 3000;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}

const gridElements = document.querySelectorAll('.grid-element');

   gridElements.forEach(element => {
       element.addEventListener('mouseover', () => {
           element.style.setProperty('--glow-color', 'blue'); // Example: Change color on hover
       });

       element.addEventListener('mouseout', () => {
           element.style.setProperty('--glow-color', 'white'); // Reset color on mouseout
       });
   });
